import React from 'react'
import { spring } from '../util';
import { Link, useLoaderData } from 'react-router-dom';

export const loader = async () => {
    const response = await spring.get('/users/person');
    const data = response.data;
    return data;
}
const Users = () => {
    const users = useLoaderData();

    return (
        <section className='pt-20 px-20'>
            <h1 className='sectionTitle capitalize'>our current users</h1>
            {users.length > 0 ? (
                <div className='overflow-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='text-left'>
                                <Header />
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <User key={index} user={user} />
                            ))}
                        </tbody>
                    </table>
                    <div className='flex justify-center w-full mt-4'>
                        <Link to="/" className='btn btn-secondary uppercase'>go home</Link>
                    </div>
                </div>

            ) : (
                <>
                    <h1 className='text-center text-4xl italic mt-8'>We don't have any users for the moment</h1>
                    <div className='flex justify-center w-full mt-4'>
                        <Link to="/" className='btn btn-secondary uppercase'>go home</Link>
                    </div>
                </>


            )}
        </section>
    );
};

const Header = () => {
    return (
        <>
            <th className='py-2 px-4'>Id</th>
            <th className='py-2 px-4'>First Name</th>
            <th className='py-2 px-4'>Last Name</th>
            <th className='py-2 px-4'>Gender</th>
            <th className='py-2 px-4'>Age</th>
            <th className='py-2 px-4'>Username</th>
            <th className='py-2 px-4'>Email</th>
            <th className='py-2 px-4'>Password</th>
        </>
    );
};

const User = (props) => {
    const { id, firstName, lastName, gender, age, username, email, password } = props.user;
    const dataCorrector = (data) => {
        if (data) return data
        return '-'
    }
    return (
        <tr className='border-b'>
            <td className='py-2 px-4'>{dataCorrector(id)}</td>
            <td className='py-2 px-4'>{dataCorrector(firstName)}</td>
            <td className='py-2 px-4'>{dataCorrector(lastName)}</td>
            <td className='py-2 px-4'>{dataCorrector(gender)}</td>
            <td className='py-2 px-4'>{dataCorrector(age)}</td>
            <td className='py-2 px-4'>{dataCorrector(username)}</td>
            <td className='py-2 px-4'>{dataCorrector(email)}</td>
            <td className='py-2 px-4'>{dataCorrector(password)}</td>
        </tr>
    );
};


export default Users;