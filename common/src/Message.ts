import { AnkiSettings, MiscSettings, SubtitleSettings } from './Settings';
import {
    RectModel,
    SubtitleModel,
    ImageModel,
    AudioModel,
    AnkiUiDialogState,
    AnkiUiContainerCurrentItem,
    AudioTrackModel,
} from './Model';

export interface Message {
    readonly command: string;
}

export interface ActiveVideoElement {
    id: number;
    title?: string;
    src: string;
}

export interface AsbplayerHeartbeatMessage extends Message {
    readonly command: 'heartbeat';
    readonly id: string;
    readonly receivedTabs?: ActiveVideoElement[];
}

export interface VideoHeartbeatMessage extends Message {
    readonly command: 'heartbeat';
}

export interface HttpPostMessage extends Message {
    readonly command: 'http-post';
    readonly url: string;
    readonly body: any;
}

export interface SettingsUpdatedMessage extends Message {
    readonly command: 'settings-updated';
}

export interface RecordMediaAndForwardSubtitleMessage extends Message {
    readonly command: 'record-media-and-forward-subtitle';
    readonly subtitle: SubtitleModel;
    readonly surroundingSubtitles: SubtitleModel[];
    readonly url?: string;
    readonly record: boolean;
    readonly screenshot: boolean;
    readonly showAnkiUi: boolean;
    readonly audioPaddingStart: number;
    readonly audioPaddingEnd: number;
    readonly playbackRate: number;
    readonly rect?: RectModel;
    readonly maxImageWidth: number;
    readonly maxImageHeight: number;
}

export interface StartRecordingMediaMessage extends Message {
    readonly command: 'start-recording-media';
    readonly record: boolean;
    readonly timestamp: number;
    readonly screenshot: boolean;
    readonly showAnkiUi: boolean;
    readonly rect?: RectModel;
    readonly maxImageWidth: number;
    readonly maxImageHeight: number;
    readonly url?: string;
}

export interface StopRecordingMediaMessage extends Message {
    readonly command: 'stop-recording-media';
    readonly showAnkiUi: boolean;
    readonly startTimestamp: number;
    readonly endTimestamp: number;
    readonly screenshot: boolean;
    readonly videoDuration: number;
    readonly url?: string;
}

export interface CopyMessage extends Message {
    readonly command: 'copy';
    readonly id?: string;
    readonly subtitle: SubtitleModel;
    readonly surroundingSubtitles: SubtitleModel[];
    readonly url?: string;
    readonly image?: ImageModel;
    readonly audio?: AudioModel;
    readonly preventDuplicate?: boolean;
}

export interface ScreenshotTakenMessage extends Message {
    readonly command: 'screenshot-taken';
}

export interface ShowAnkiUiMessage extends Message {
    readonly command: 'show-anki-ui';
    readonly id: string;
    readonly subtitle: SubtitleModel;
    readonly surroundingSubtitles: SubtitleModel[];
    readonly url?: string;
    readonly image?: ImageModel;
    readonly audio?: AudioModel;
}

export interface RerecordMediaMessage extends Message {
    readonly command: 'rerecord-media';
    readonly duration: number;
    readonly uiState: AnkiUiDialogState;
    readonly audioPaddingStart: number;
    readonly audioPaddingEnd: number;
    readonly currentItem: AnkiUiContainerCurrentItem;
    readonly playbackRate: number;
    readonly timestamp: number;
}

export interface ShowAnkiUiAfterRerecordMessage extends Message {
    readonly command: 'show-anki-ui-after-rerecord';
    readonly id: string;
    readonly uiState: AnkiUiDialogState;
    readonly audio: AudioModel;
}

export interface SerializedSubtitleFile {
    name: string;
    base64: string;
}

export interface LegacyPlayerSyncMessage extends Message {
    readonly command: 'sync';
    readonly subtitles: SerializedSubtitleFile;
}

export interface PlayerSyncMessage extends Message {
    readonly command: 'syncv2';
    readonly subtitles: SerializedSubtitleFile[];
}

export interface ExtensionSyncMessage extends Message {
    readonly command: 'sync';
    readonly subtitles: SerializedSubtitleFile[];
}

export interface OffsetFromVideoMessage extends Message {
    readonly command: 'offset';
    readonly value: number;
}

export interface ToggleSubtitlesMessage extends Message {
    readonly command: 'toggle-subtitles';
}

export interface ToggleSubtitlesInListFromVideoMessage extends Message {
    readonly command: 'toggleSubtitleTrackInList';
    readonly track: number;
}

export interface ReadyStateFromVideoMessage extends Message {
    readonly command: 'readyState';
    readonly value: number;
}

export interface ReadyFromVideoMessage extends Message {
    readonly command: 'ready';
    readonly duration: number;
    readonly currentTime: number;
    readonly paused: boolean;
    readonly audioTracks?: AudioTrackModel[];
    readonly selectedAudioTrack?: string;
    readonly playbackRate: number;
}

export interface ReadyToVideoMessage extends Message {
    readonly command: 'ready';
    readonly duration: number;
}

export interface PlayFromVideoMessage extends Message {
    readonly command: 'play';
    readonly echo: boolean;
}

export interface PauseFromVideoMessage extends Message {
    readonly command: 'pause';
    readonly echo: boolean;
}

export interface CurrentTimeFromVideoMessage extends Message {
    readonly command: 'currentTime';
    readonly value: number;
    readonly echo: boolean;
}

export interface CurrentTimeToVideoMessage extends Message {
    readonly command: 'currentTime';
    readonly value: number;
}

export interface PlaybackRateFromVideoMessage extends Message {
    readonly command: 'playbackRate';
    readonly value: number;
    readonly echo: boolean;
}

export interface AudioTrackSelectedFromVideoMessage extends Message {
    readonly command: 'audioTrackSelected';
    readonly id: string;
}

export interface AudioTrackSelectedToVideoMessage extends Message {
    readonly command: 'audioTrackSelected';
    readonly id: string;
}

export interface AnkiDialogRequestFromVideoMessage extends Message {
    readonly command: 'ankiDialogRequest';
    readonly forwardToVideo: boolean;
}

export interface ToggleSubtitleTrackInListFromVideoMessage extends Message {
    readonly command: 'toggleSubtitleTrackInList';
    readonly track: number;
}

export interface SubtitlesToVideoMessage extends Message {
    readonly command: 'subtitles';
    readonly value: SubtitleModel[];
    readonly name?: string;
    readonly names: string[];
}

export interface SubtitleSettingsToVideoMessage extends Message {
    readonly command: 'subtitleSettings';
    readonly value: SubtitleSettings;
}

export interface CondensedModeToggleToVideoMessage extends Message {
    readonly command: 'condensedModeToggle';
    readonly value: boolean;
}

export interface HideSubtitlePlayerToggleToVideoMessage extends Message {
    readonly command: 'hideSubtitlePlayerToggle';
    readonly value: boolean;
}

export interface AppBarToggleMessageToVideoMessage extends Message {
    readonly command: 'appBarToggle';
    readonly value: boolean;
}

export interface FinishedAnkiDialogRequestToVideoMessage extends Message {
    readonly command: 'finishedAnkiDialogRequest';
    readonly resume: boolean;
}

export interface AnkiSettingsToVideoMessage extends Message {
    readonly command: 'ankiSettings';
    readonly value: AnkiSettings;
}

export interface MiscSettingsToVideoMessage extends Message {
    readonly command: 'miscSettings';
    readonly value: MiscSettings;
}