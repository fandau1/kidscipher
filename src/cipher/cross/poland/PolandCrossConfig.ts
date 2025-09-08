export type PolandCrossConfig = {
    topLine: boolean;
    bottomLine: boolean;
    leftLine: boolean;
    rightLine: boolean;
    dotPosition: 0 | 1 | 2;
}


export const POLAND_CROSS_CONFIG_MAP: Record<string, PolandCrossConfig> = {
    'A': {
        leftLine: false,
        rightLine: true,
        topLine: false,
        bottomLine: true,
        dotPosition: 0,
    },
    'B': {
        leftLine: false,
        rightLine: true,
        topLine: false,
        bottomLine: true,
        dotPosition: 1,
    },
    'C': {
        leftLine: false,
        rightLine: true,
        topLine: false,
        bottomLine: true,
        dotPosition: 2,
    },
    // next type
    'D': {
        leftLine: true,
        rightLine: true,
        topLine: false,
        bottomLine: true,
        dotPosition: 0,
    }, 
    'E': {
        leftLine: true,
        rightLine: true,
        topLine: false,
        bottomLine: true,
        dotPosition: 1,
    }, 
    'F': {
        leftLine: true,
        rightLine: true,
        topLine: false,
        bottomLine: true,
        dotPosition: 2,
    }, 
    // next type
    'G': {
        leftLine: true,
        rightLine: false,
        topLine: false,
        bottomLine: true,
        dotPosition: 0,
    },
    'H': {
        leftLine: true,
        rightLine: false,
        topLine: false,
        bottomLine: true,
        dotPosition: 1,
    },
    'CH': {
        leftLine: true,
        rightLine: false,
        topLine: false,
        bottomLine: true,
        dotPosition: 2,
    },
    // next type
    'I': {
        leftLine: false,
        rightLine: true,
        topLine: true,
        bottomLine: true,
        dotPosition: 0,
    },
    'J': {
        leftLine: false,
        rightLine: true,
        topLine: true,
        bottomLine: true,
        dotPosition: 1,
    },
    'K': {
        leftLine: false,
        rightLine: true,
        topLine: true,
        bottomLine: true,
        dotPosition: 2,
    },
    // next type
    'L': {
        leftLine: true,
        rightLine: true,
        topLine: true,
        bottomLine: true,
        dotPosition: 0,
    },
    'M': {
        leftLine: true,
        rightLine: true,
        topLine: true,
        bottomLine: true,
        dotPosition: 1,
    },
    'N': {
        leftLine: true,
        rightLine: true,
        topLine: true,
        bottomLine: true,
        dotPosition: 2,
    },
    // next type
    'O': {
        leftLine: true,
        rightLine: false,
        topLine: true,
        bottomLine: true,
        dotPosition: 0,
    },
    'P': {
        leftLine: true,
        rightLine: false,
        topLine: true,
        bottomLine: true,
        dotPosition: 1,
    },
    'Q': {
        leftLine: true,
        rightLine: false,
        topLine: true,
        bottomLine: true,
        dotPosition: 2,
    },
    // next type
    'R': {
        leftLine: false,
        rightLine: true,
        topLine: true,
        bottomLine: false,
        dotPosition: 0,
    },
    'S': {
        leftLine: false,
        rightLine: true,
        topLine: true,
        bottomLine: false,
        dotPosition: 1,
    },
    'T': {
        leftLine: false,
        rightLine: true,
        topLine: true,
        bottomLine: false,
        dotPosition: 2,
    },
    // next type
    'U': {
        leftLine: true,
        rightLine: true,
        topLine: true,
        bottomLine: false,
        dotPosition: 0,
    },
    'V': {
        leftLine: true,
        rightLine: true,
        topLine: true,
        bottomLine: false,
        dotPosition: 1,
    },
    'W': {
        leftLine: true,
        rightLine: true,
        topLine: true,
        bottomLine: false,
        dotPosition: 2,
    },
    // next type
    'X': {
        leftLine: true,
        rightLine: false,
        topLine: true,
        bottomLine: false,
        dotPosition: 0,
    },
    'Y': {
        leftLine: true,
        rightLine: false,
        topLine: true,
        bottomLine: false,
        dotPosition: 1,
    },
    'Z': {
        leftLine: true,
        rightLine: false,
        topLine: true,
        bottomLine: false,
        dotPosition: 2,
    },
}
