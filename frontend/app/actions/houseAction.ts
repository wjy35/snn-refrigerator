export const toggleVisible = 'toggleVisible';

export const toggleVisibleAction = (res: any) => {
  return {
    type: toggleVisible,
    payload: res,
  }
}
