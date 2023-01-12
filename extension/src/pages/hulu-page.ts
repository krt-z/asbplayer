import { VideoDataSubtitleTrack } from '@project/common';

setTimeout(() => {
    let basename: string | undefined = '';
    let subtitles: VideoDataSubtitleTrack[] = [];
    let path = window.location.pathname;

    function tryResetState() {
        if (path !== window.location.pathname) {
            basename = undefined;
            subtitles = [];
            path = window.location.pathname;
        }
    }

    function isObject(val: any) {
        return typeof val === 'object' && !Array.isArray(val) && val !== null;
    }

    const originalParse = JSON.parse;
    JSON.parse = function () {
        // @ts-ignore
        const value = originalParse.apply(this, arguments);

        if (typeof value?.param1?.program === 'string' && typeof value?.param1?.title === 'string') {
            tryResetState();
            if (value.param1.program === value.param1.title) {
                basename = value.param1.program;
            } else {
                basename = `${value.param1.program} ${value.param1.title}`;
            }
        }

        return value;
    };

    function extractSubtitleTracks(value: any) {
        if (isObject(value.transcripts_urls?.webvtt)) {
            tryResetState();
            const urls = value.transcripts_urls.webvtt;

            for (const language of Object.keys(urls)) {
                const url = urls[language];

                if (typeof url === 'string') {
                    subtitles.push({
                        label: language,
                        language: language.toLowerCase(),
                        url: url,
                    });
                }
            }
        }
    }

    function fetchPlaylist(payload: any) {
        setTimeout(() => {
            fetch('https://play.hulu.com/v6/playlist', {
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: payload,
            })
                .then((response) => response.json())
                .then((json) => extractSubtitleTracks(json));
        }, 0);
    }

    const originalStringify = JSON.stringify;
    JSON.stringify = function (value) {
        // @ts-ignore
        const stringified = originalStringify.apply(this, arguments);
        if (
            typeof value?.content_eab_id === 'string' &&
            typeof value?.playback === 'object' &&
            value?.playback !== null
        ) {
            fetchPlaylist(stringified);
        }

        return stringified;
    };

    document.addEventListener(
        'asbplayer-get-synced-data',
        () => {
            tryResetState();
            const response = {
                error: '',
                basename: basename,
                extension: 'vtt',
                subtitles: subtitles,
            };
            document.dispatchEvent(
                new CustomEvent('asbplayer-synced-data', {
                    detail: response,
                })
            );
        },
        false
    );
}, 0);
