import React, { useState } from 'react'
import InputType from '../forms/InputType'
import API from '../../../services/API'
import { useSelector } from 'react-redux'

const Modal = () => {
    const [inventoryType, setInventoryType] = useState("in")
    const [bloodGroup, setBloodGroup] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [email, setEmail] = useState("")
    const [ID, setID] = useState("")
    const [gender, setGender] = useState("")
    const [weight, setWeight] = useState("")
    const { user } = useSelector((state) => state.auth)
    //handle modal submit
    const handleModalSubmit = async () => {
        try {
            if (!bloodGroup || !quantity) {
                return alert("Please provide all fields")
            }
            const { data } = await API.post('/inventory/create-inventory', {
                ID,
                email,
                organisation: user?._id,
                donar: user?._id,
                inventoryType,
                bloodGroup,
                weight,
                gender,
                quantity
            })
            if (data?.success) {
                alert("New record created")
                window.location.reload()
            }
        } catch (error) {
            alert(error.response.data.message)
            console.log(error)
            window.location.reload()
        }
    }
    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Manage Blood Record</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className='d-flex mb-3'>
                                Blood Type: &nbsp;
                                <div className='form-check ms-3'>
                                    <input type='radio'
                                        name='inRadio'
                                        defaultChecked
                                        value={"in"}
                                        onChange={(e) => setInventoryType(e.target.value)}
                                        className='form-check-input' />
                                    <label htmlFor='in' className='form-check-label'>
                                        IN
                                    </label>
                                </div>
                                <div className='form-check ms-3'>
                                    <input type='radio'
                                        name='inRadio'
                                        value={"out"}
                                        onChange={(e) => setInventoryType(e.target.value)}
                                        className='form-check-input' />
                                    <label htmlFor='out' className='form-check-label'>
                                        OUT
                                    </label>
                                </div>
                            </div>
                            <select className="form-select" aria-label="Default select example"
                                onChange={(e) => setBloodGroup(e.target.value)}>
                                <option selected>Open this select menu</option>
                                <option value={'O+'}>O+</option>
                                <option value={'O-'}>O-</option>
                                <option value={'AB+'}>AB+</option>
                                <option value={'AB-'}>AB-</option>
                                <option value={'A+'}>A+</option>
                                <option value={'A-'}>A-</option>
                                <option value={'B+'}>B+</option>
                                <option value={'B-'}>B-</option>
                            </select>
                            {inventoryType === 'in' && (
                                <select className="form-select mt-3 mb-3" aria-label="Default select example"
                                    value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            )}

                            <InputType labelText={'Donor/Hospital Email'}
                                labelFor={'donarEmail'}
                                inputType={'email'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputType labelText={'ID'}
                                labelFor={'ID'}
                                inputType={'ID'}
                                value={ID}
                                onChange={(e) => setID(e.target.value)}
                            />
                            {inventoryType === 'in' && (
                                <InputType labelText={'Weight'}
                                    labelFor={'weight'}
                                    inputType={'Number'}
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            )}
                            {inventoryType === 'in' ? (
                                <select className="form-select" aria-label="Select quantity"
                                    value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                    <option value="">Select quantity (ML)</option>
                                    <option value="350">350 ML</option>
                                    <option value="450">450 ML</option>
                                    {/* Add more options as needed */}
                                </select>
                            ) : (
                                <select className="form-select" aria-label="Select quantity"
                                    value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                    <option value="">Select quantity (ML)</option>
                                    <option value="200">200 ML</option>
                                    <option value="250">250 ML</option>
                                    <option value="300">300 ML</option>
                                    <option value="350">350 ML</option>
                                    <option value="400">400 ML</option>
                                    <option value="450">450 ML</option>
                                    <option value="500">500 ML</option>
                                    {/* Add more options as needed */}
                                </select>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>Submit</button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Modal
