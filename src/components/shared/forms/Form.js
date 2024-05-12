import { useState } from 'react'
import React from 'react'
import InputType from './InputType'
import { Link } from "react-router-dom"
import { handleLogin, handleRegister } from '../../../services/authService'
import validator from 'validator'

const Form = ({ formType, submitBtn, formTitle }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [name, setName] = useState('')
    const [organisationName, setOrganisationName] = useState('')
    const [hospitalName, setHospitalName] = useState('')
    const [website, setWebsite] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    // const handleEmailChange = (e) => {
    //     const enteredEmail = e.target.value;
    //     setEmail(enteredEmail); // Update email state

    //     // Check if the entered email is valid using validator
    //     if (!validator.isEmail(enteredEmail)) {
    //         // Display error message or handle invalid email
    //         alert('Invalid email address');
    //         // Optionally, you can clear the email field or show an error message
    //     }
    // };

    const handlePasswordChange = (e) => {
        const enteredValue = e.target.value;

        // Check the length of the entered password
        if (enteredValue.length >= 0 && enteredValue.length <= 12) {
            setPassword(enteredValue);
        }
        else {
            if (enteredValue.length <= 0) {
                alert('Password must be at least 6 characters long');
            } else if (enteredValue.length > 12) {
                alert('Password cannot exceed 12 characters');
            }
            // Optionally, reset the password state to the previous value
            // setPassword(password); // Uncomment this line if you want to revert to the previous value
        }
    };
    return (
        <div>
            <form onSubmit={(e) => {
                if (formType === 'login') return handleLogin(e, email, password, role)
                else if (formType === 'register') return handleRegister(
                    e,
                    email,
                    password,
                    name,
                    role,
                    organisationName,
                    hospitalName,
                    website,
                    address,
                    phone
                )
            }}>
                <h1 className='text-center'>{formTitle}</h1>
                <hr />
                <div className='d-flex mb-3'>
                    <div className='form-check'>
                        <input type='radio'
                            className='form-check-input'
                            name='role'
                            id='donarRadio'
                            value={'donar'}
                            onChange={(e) => setRole(e.target.value)}
                            defaultChecked />
                        <label htmlFor='donarRadio' className='form-check-label'>
                            Donor
                        </label>
                    </div>

                    <div className='form-check ms-2'>
                        <input type='radio'
                            className='form-check-input'
                            name='role'
                            id='adminRadio'
                            value={'admin'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor='adminRadio' className='form-check-label'>
                            Admin
                        </label>
                    </div>

                    <div className='form-check ms-2'>
                        <input type='radio'
                            className='form-check-input'
                            name='role'
                            id='hospitalRadio'
                            value={'hospital'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor='hospitalRadio' className='form-check-label'>
                            Hospital
                        </label>
                    </div>

                    <div className='form-check ms-2'>
                        <input type='radio'
                            className='form-check-input'
                            name='role'
                            id='organisationRadio'
                            value={'organisation'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor='organisationRadio' className='form-check-label'>
                            Organisation
                        </label>
                    </div>

                </div>
                {/* switch statements */}
                {(() => {
                    //eslint-disable-next-line
                    switch (true) {
                        case formType === "login": {
                            return (
                                <>
                                    <InputType
                                        labelText={'Email'}
                                        labelFor={'forEmail'}
                                        inputType={'email'}
                                        name={'email'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <InputType
                                        labelText={'Password'}
                                        labelFor={'forPassword'}
                                        inputType={'password'}
                                        name={'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </>
                            )
                        }
                        case formType === 'register': {
                            // const handlePasswordChange = (e) => {
                            //     const enteredValue = e.target.value;

                            //     // Check the length of the entered password
                            //     if (enteredValue.length >= 6 && enteredValue.length <= 12) {
                            //         setPassword(enteredValue);
                            //     } else {
                            //         if (enteredValue.length < 6) {
                            //             alert('Password must be at least 6 characters long');
                            //         } else if (enteredValue.length > 12) {
                            //             alert('Password cannot exceed 12 characters');
                            //         }
                            //         // Optionally, reset the password state to the previous value
                            //         // setPassword(password); // Uncomment this line if you want to revert to the previous value
                            //     }
                            // };
                            return (
                                <>
                                    <InputType
                                        labelText={'Email'}
                                        labelFor={'forEmail'}
                                        inputType={'email'}
                                        name={'email'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <InputType
                                        labelText={'Password'}
                                        labelFor={'forPassword'}
                                        inputType={'password'}
                                        pattern='.{6,12}'
                                        name={'password'}
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    {
                                        (role === 'admin' || role === 'donar') && (
                                            <InputType
                                                labelText={'Name'}
                                                labelFor={'forName'}
                                                inputType={'text'}
                                                name={'name'}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        )}
                                    {role === 'organisation' && (
                                        <InputType
                                            labelText={'Organisation Name'}
                                            labelFor={'forOrganisationName'}
                                            inputType={'text'}
                                            name={'organisationName'}
                                            value={organisationName}
                                            onChange={(e) => setOrganisationName(e.target.value)}
                                        />
                                    )}

                                    {role === 'hospital' && (
                                        <InputType
                                            labelText={'Hospital Name'}
                                            labelFor={'forHospitalName'}
                                            inputType={'text'}
                                            name={'hospitalName'}
                                            value={hospitalName}
                                            onChange={(e) => setHospitalName(e.target.value)}
                                        />
                                    )}


                                    <InputType
                                        labelText={'Website'}
                                        labelFor={'forWebsite'}
                                        inputType={'text'}
                                        name={'website'}
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                    />
                                    <InputType
                                        labelText={'Address'}
                                        labelFor={'forAddress'}
                                        inputType={'text'}
                                        name={'address'}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    <InputType
                                        labelText={'Phone'}
                                        labelFor={'forPhone'}
                                        inputType={'number'}
                                        name={'Phone'}
                                        value={phone}
                                        onChange={(e) => {
                                            const enteredValue = e.target.value;

                                            // Check if the entered value is a valid phone number (exactly 10 digits) or empty
                                            if (/^\d{0,10}$/.test(enteredValue)) {
                                                // Update the state with the entered phone number
                                                setPhone(enteredValue);
                                            } else {
                                                // Display an alert or handle invalid input (optional)
                                                alert('Please enter a valid 10-digit phone number');
                                                // You may choose to reset the phone state to the previous value here
                                                // setPhone(phone); // Uncomment this line if you want to revert to the previous value
                                            }
                                        }}
                                    />
                                </>
                            )
                        }
                        default:
                            return null
                    }
                })()}
                {/* <InputType
                    labelText={'Email'}
                    labelFor={'forEmail'}
                    inputType={'email'}
                    name={'email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputType
                    labelText={'Password'}
                    labelFor={'forPassword'}
                    inputType={'password'}
                    name={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputType
                    labelText={'Name'}
                    labelFor={'forName'}
                    inputType={'text'}
                    name={'name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputType
                    labelText={'Organisation Name'}
                    labelFor={'forOrganisationName'}
                    inputType={'text'}
                    name={'organisationName'}
                    value={organisationName}
                    onChange={(e) => setOrganisationName(e.target.value)}
                />
                <InputType
                    labelText={'Hospital Name'}
                    labelFor={'forHospitalName'}
                    inputType={'text'}
                    name={'hospitalName'}
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                />
                <InputType
                    labelText={'Website'}
                    labelFor={'forWebsite'}
                    inputType={'text'}
                    name={'website'}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
                <InputType
                    labelText={'Address'}
                    labelFor={'forAddress'}
                    inputType={'text'}
                    name={'address'}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <InputType
                    labelText={'Phone'}
                    labelFor={'forPhone'}
                    inputType={'text'}
                    name={'Phone'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                /> */}
                <div className='d-flex flex-row justify-content-between'>
                    {formType === 'login' ? (
                        <p>
                            Not registered yet? Register
                            <Link to='/register'> Here! </Link>
                        </p>
                    ) : (
                        <p>
                            Already Registered? Login
                            <Link to='/login'> Here! </Link>
                        </p>
                    )
                    }
                    <button className='btn btn-primary' type='submit'>
                        {submitBtn}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form
