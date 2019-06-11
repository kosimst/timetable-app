export default (date: Date) => {
  const clone = new Date(date.getTime())
  return `${
    clone.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
      ? 'heute'
      : clone.setHours(0, 0, 0, 0) ===
        new Date(Date.now() - 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0)
      ? 'gestern'
      : `vor ${Math.trunc(
          (Date.now() - date.getTime()) / 1000 / 60 / 60 / 24,
        )} Tagen`
  } um ${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes(),
  ).padStart(2, '0')}`
}
