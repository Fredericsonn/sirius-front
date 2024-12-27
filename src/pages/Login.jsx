import React, { useEffect } from 'react'
import { Form, Link} from 'react-router-dom';
import { FormInput } from '../components'
import 'react-toastify/dist/ReactToastify.css';

export const action = (store) => async ({ request }) => {
  return null;
};

const Login = () => {

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <section className='card h-screen w-screen justify-center items-center'>
      <h1 className='text-4xl text-center font-semibold text-primary'>Login</h1>
      <Form method='POST' className='flex flex-col gap-4 w-96 mt-4'>
        <FormInput label='username' name='username' type='text' placeholder='username' size='btn-block' defaultValue='eco' />
        <FormInput label='password' name='password' type='password' placeholder='********' size='btn-block' defaultValue='ecotracer' />
        <button type='submit' className='btn btn-primary btn-block uppercase mt-3'>login</button>
        <button className='btn btn-secondary btn-block uppercase'>Guest</button>
        <span className='text-center'>Haven't registered yet ?
          <Link to='/register' className='link link-secondary no-underline'> Register</Link>
        </span>
      </Form>
    </section>
  )
};

export default Login;