declare function include(src: string): void;
declare enum WindowType {
    CHILD = 0,
    PARENT = 1
}
declare var windowType: number;
declare var xOff: number;
declare var yOff: number;
declare var xPos: number;
declare var yPos: number;
declare var flagRun: boolean;
declare var isDevMode: boolean;
declare var children: Window[];
declare var functionsToRun: Function[];
interface Window {
    parentWindow: Window;
}
declare var globalEval: typeof eval;
declare function EvaluateInThisContext(aFunction: Function): void;
declare function removeChild(aWindow: Window): void;
declare function changeTitle(title: string): void;
declare function openWindow(url: string): void;
declare function proCreate(): Promise<void>;
declare function newXlt(): void;
declare function newXrt(): void;
declare function newYup(): void;
declare function newYdn(): void;
declare function fOff(): void;
declare function playBall(): void;
declare function pasteIdiot(): void;
declare function run(): void;
declare function isDeadlyKey(key: string): boolean;
declare var oldClose: (() => void) & typeof close;
declare function declareEvents(): void;
