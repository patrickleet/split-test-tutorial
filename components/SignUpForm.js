export default function SignUpForm ({lead, signup}) {
  function submit(e) {
    e.preventDefault()
    let email = e.target.elements.email.value
    if (email) {
      signup({email})
    } else {
      alert("Email is Required")
    }
  }
  return (
    <div>
      {typeof lead.email === 'string' && lead.email.length > 0 ? 
      <p>Hello {lead.email}</p>
      :
      <form onSubmit={submit}>
        <input name="email" type="email" placeholder="Enter your email..." />
        <button>Submit</button>
      </form>
      }
    </div>
  )
}