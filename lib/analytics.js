export const track = ({event, value}) => {
  console.log('track', event, {
    value
  })

  if (process.browser) {
    window.ga && window.ga('send', 'event', {
      eventCategory: event,
      eventLabel: value
    })
    window.fbq && window.fbq('track', event, {
      value
    })
  }
}
