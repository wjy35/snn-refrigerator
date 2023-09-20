export const sample = 'sample';

export const sampleAction = (res: any) => {
  return {
    type: sample,
    payload: res,
  }
}
