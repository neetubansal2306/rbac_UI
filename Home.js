import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [customerList, setCustomerList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomerList = async () => {
            const jwttoken = sessionStorage.getItem('jwttoken');

            if (!jwttoken) {
                // If there's no token, redirect to login
                navigate('/login');
                return;
            }

            try {
                const response = await fetch("https://localhost:44308/Customer", {
                    headers: {
                        'Authorization': 'Bearer ' + jwttoken
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCustomerList(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerList();
    }, [navigate]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    return (
        <div>
            <h1 className="text-center">Welcome to Nihira Techies</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Credit Limit</th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.length > 0 ? (
                        customerList.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.creditLimit}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No customers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Home;