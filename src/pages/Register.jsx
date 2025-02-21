import React from 'react'
import { Form, Link, redirect } from 'react-router-dom';
import { FormInput, FormSelect, Logo } from '../components';
import { spring } from "../util/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await spring.post('/users/person/post', data);
  toast.success(response.data.msg);
  return redirect('/login');

}
const Register = () => {
  return (
    <>
      <div className='fixed left-32 top-72'>
        <Logo size="text-4xl" />
      </div>
      <div className='card h-full w-full justify-center items-center py-10'>
        <h1 className='text-center text-primary font-semibold text-3xl'>Register</h1>
        <Form className='form-control flex flex-col w-80' method='POST'>
          <FormInput label="first name" type="text" name="firstName" placeholder="First Name" size="btn-block" />
          <FormInput label="last name" type="text" name="lastName" placeholder="Last Name" size="btn-block" />
          <FormSelect label="gender" name="gender" placeholder="gender" size="btn-block" options={["Male", "Female"]} />
          <FormInput label="age" type="number" name="age" defaultValue="18" min={13} max={100} size="btn-block" />
          <FormInput label="username" type="text" name="username" placeholder="username" size="btn-block" required={true} defaultValue="eco" />
          <FormInput label="email" type="email" name="email" placeholder="email" size="btn-block" required={true} defaultValue="eco@tracer.com" />
          <FormInput label="password" type="password" name="password" placeholder="password" size="btn-block" required={true} defaultValue="ecotracer" />
          <button type='submit' className='btn btn-secondary btn-block uppercase mt-3'>register</button>
          <span className='text-center mt-2'>Already have an account ?
            <Link to='/login' className='link link-secondary no-underline'> Login</Link>
            
          </span>
        </Form>
      </div>
    </>
  )
}

export default Register;