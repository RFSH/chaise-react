interface ICustomWindow extends Window {
    ERMrest: any;
}

declare var window: ICustomWindow;

export const windowRef = window;
