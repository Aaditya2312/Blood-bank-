import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import API from '../../services/API'
import Spinner from '../../components/shared/Spinner'
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { Card } from 'react-bootstrap';
Chart.register(...registerables);

const AdminHome = () => {
    const { loading, error, user } = useSelector((state) => state.auth)
    const [data, setData] = useState([])
    const [chartData, setChartData] = useState({ labels: [], dataCounts: [] })
    const [bloodGroups, setBloodGroups] = useState({})
    const navigate = useNavigate()
    //get function
    const getBloodRecords = async () => {
        try {
            const { data } = await API.get('/admin/org-inventory')
            console.log('Received data:', data);
            if (data?.success) {
                setData(data?.inventory)
                console.log(data)
                // console.log("Success")
                // console.log(typeof data)
                const bloodGroupsData = {}; // Temporary object to store blood groups counts
                data.inventory.forEach(record => {
                    const group = record.bloodGroup;
                    bloodGroupsData[group] = (bloodGroupsData[group] || 0) + 1; // Increment count for each blood group
                });

                // Set bloodGroups state
                setBloodGroups(bloodGroupsData);

                const labels = Object.keys(bloodGroupsData);
                const dataCounts = Object.values(bloodGroupsData);
                setChartData({ labels, dataCounts });
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getBloodRecords()
    }, [])
    return (
        <Layout>
            {error && <span>{alert(error)}</span>}
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className='container' style={{ position: 'relative', minHeight: '100vh' }}>
                        <img src="https://c1.wallpaperflare.com/preview/202/740/23/various-blood-doctor-hand.jpg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
                        {/* <h4 className='ms-4'
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            style={{ cursor: 'pointer' }}>
                            <i className='fa-solid fa-plus text-success py-4'></i>
                            Add Inventory
                        </h4> */}
                        <div>
                            <Bar
                                data={{
                                    labels: chartData.labels,
                                    datasets: [{
                                        label: 'Donations by Blood Group',
                                        data: chartData.dataCounts,
                                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                        borderColor: 'rgba(255, 99, 132, 1)',
                                        borderWidth: 1
                                    }]
                                }}
                                options={{
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    }
                                }}
                            />
                        </div>
                        <Card style={{ width: '100%', backgroundColor: 'rgba(210, 130, 240, 0.5)', opacity: 0.7 }}>
                            <Card.Body>
                                <table className="table" style={{ backgroundColor: 'rgba(210, 130, 240, 0.5)', opacity: 0.7, '!important': true }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Blood Group</th>
                                            <th scope="col">Inventory Type</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Donor Email</th>
                                            <th scope="col">Time & Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((record) => (
                                            <tr key={record._id}>
                                                <td>{record.bloodGroup}</td>
                                                <td>{record.inventoryType}</td>
                                                <td>{record.quantity} (ML)</td>
                                                <td>{record.email}</td>
                                                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </Card.Body>
                        </Card>
                        <div>
                            {Object.entries(bloodGroups).map(([group, count]) => (
                                <div key={group}>
                                    {group}: {count}
                                </div>
                            ))}
                        </div>


                    </div>
                </>
            )}
        </Layout>
    )
}

export default AdminHome
