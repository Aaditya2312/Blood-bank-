import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment'
import API from '../../services/API'
import { useSelector } from "react-redux"
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const OrganisationPage = () => {
    //get current user
    const { user } = useSelector(state => state.auth)
    const [data, setData] = useState([])

    //get org records
    const getOrg = async () => {
        try {
            if (user?.role === 'donar') {
                const { data } = await API.get('/inventory/get-organisation')
                // console.log(data)
                if (data?.success) {
                    setData(data?.organisations)
                }
            }
            if (user?.role === 'hospital') {
                const { data } = await API.get('/inventory/get-organisation-for-hospital')
                // console.log(data)
                if (data?.success) {
                    setData(data?.organisations)
                }
            }


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getOrg()
    }, [user])

    return (
        <Layout>
            <div className='container' style={{ position: 'relative', minHeight: '100vh', paddingTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <img src="https://c1.wallpaperflare.com/preview/202/740/23/various-blood-doctor-hand.jpg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
                <Card style={{ width: '100%', backgroundColor: 'rgba(210, 130, 240, 0.5)', opacity: 0.7 }}>
                    {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src="..." alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="..." alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="..." alt="Third slide" />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                </div> */}
                    <Card.Body>
                        <table className="table" style={{ width: '100%', backgroundColor: 'rgba(210, 130, 240, 0.5)', opacity: 0.7, '!important': true }}>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Date</th>

                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((record) => (
                                    <tr key={record._id}>
                                        <td>{record.organisationName}</td>
                                        <td>{record.email}</td>
                                        <td>{record.phone}</td>
                                        <td>{record.address}</td>
                                        <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <div>
                            <h4>Standards for blood donation and transfusion</h4>
                            <ul>
                                <li>Rule 1: Blood Donations can only be done by people above 50kg of weight.</li>

                                <li>Rule 2: Either 350ml or 450ml can be donated in one drive of donation.</li>

                                <li>Rule 3: Blood can be transfused by donors who have registered on this portal
                                    and donated blood to any organisation registered on this portal.
                                </li>

                                <li>Rule 4: Blood can also be transfused by hospitals who have registered on this portal
                                </li>

                                <li>Rule 5: Blood cannot be transfused to any donor more than his donation to any specific organisation.
                                </li>

                                <li>Rule 6: If a patient requires a lot of blood, the respective hospital can initiate a transfusion request
                                    to the particular organisation.
                                </li>
                                {/* Add more rules as needed */}
                            </ul>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default OrganisationPage
