export interface App {
    name: string;
    icon: string;
    nickName: string;
}

export interface VisibleApps {
    [key: string]: boolean;
}

export interface IsPressed {
    [key: string]: boolean;
}

export interface ZIndexes {
    [key: string]: number;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies?: string[];
    features?: string[];
    liveUrl?: string;
    githubUrl?: string;
}
