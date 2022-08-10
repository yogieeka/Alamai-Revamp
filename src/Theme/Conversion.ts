export function currency(value: any, withFlag = true) {
  if (isNaN(value) || !value) return withFlag ? 'Rp 0' : '0'
  return (
    (withFlag ? 'Rp ' : '') +
    value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  )
}
