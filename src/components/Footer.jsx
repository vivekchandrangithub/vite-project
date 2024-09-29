import React from 'react'

const Footer = () => {
  return (
    <footer className="footer flex flex-col sm:flex-row flex-wrap bg-base-200 text-base-content p-6 sm:p-10">
    <nav className="mb-6 sm:mb-0 sm:mr-8 w-full sm:w-auto">
      <h6 className="footer-title text-lg font-bold mb-2">Services</h6>
      <a className="link link-hover block">Branding</a>
      <a className="link link-hover block">Design</a>
      <a className="link link-hover block">Marketing</a>
      <a className="link link-hover block">Advertisement</a>
    </nav>
    <nav className="mb-6 sm:mb-0 sm:mr-8 w-full sm:w-auto">
      <h6 className="footer-title text-lg font-bold mb-2">Company</h6>
      <a className="link link-hover block">About us</a>
      <a className="link link-hover block">Contact</a>
      <a className="link link-hover block">Jobs</a>
      <a className="link link-hover block">Press kit</a>
    </nav>
    <nav className="mb-6 sm:mb-0 sm:mr-8 w-full sm:w-auto">
      <h6 className="footer-title text-lg font-bold mb-2">Legal</h6>
      <a className="link link-hover block">Terms of use</a>
      <a className="link link-hover block">Privacy policy</a>
      <a className="link link-hover block">Cookie policy</a>
    </nav>
    <form className="w-full sm:w-auto">
      <h6 className="footer-title text-lg font-bold mb-2">Newsletter</h6>
      <fieldset className="form-control">
        <label className="label">
          <span className="label-text">Enter your email address</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="username@site.com"
            className="input input-bordered w-full sm:w-auto"
          />
          <button className="btn btn-primary w-full sm:w-auto">Subscribe</button>
        </div>
      </fieldset>
    </form>
  </footer>
  

  )
}

export default Footer
