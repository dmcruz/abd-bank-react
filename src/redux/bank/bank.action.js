export const withdrawBells = bells => ({
    type: 'WITHDRAW_BELLS',
    payload: bells
});

export const depositBells = bells => ({
    type: 'DEPOSIT_BELLS',
    payload: bells
});

/**
 * Initiate withdrawal request
 */
export const withdrawalRequest = bellsRequested => ({
    type: 'WITHDRAWAL_REQUEST',
    payload: bellsRequested
});

export const withdrawalSuccess = () => ({
    type: 'WITHDRAWAL_SUCCESS'
});

export const withdrawalFail = errorMessage => ({
    type: 'WITHDRAWAL_FAIL',
    payload: errorMessage
});

export const depositRequest = bellsRequested => ({
    type: 'DEPOSIT_REQUEST',
    payload: bellsRequested
});

export const depositSuccess = () => ({
    type: 'DEPOSIT_SUCCESS',
});

export const depositFail = errorMessage => ({
    type: 'DEPOSIT_FAIL',
    payload: errorMessage
});