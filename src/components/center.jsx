import './center.css';
import React, {useState, useEffect} from 'react';


const Center = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredData, setFilteredData] = useState([])

	useEffect(() => {
		fetch('https://isro.vercel.app/api/customer_satellites')
		.then((response) => {
			if (!response.ok){
				throw new Error('Network response was not ok')
			}
			else{
				return response.json()
			}
		})
		.then((data) => {
			setData(data.customer_satellites)
			setLoading(false)
		})
		.catch((error) => {
			setError(error)
			setLoading(false)
		})
	},[])

	useEffect(() => {
		if(searchTerm){
			const filtered = data.filter((satellite) => 
				satellite.country.toLowerCase().includes(searchTerm.toLowerCase()))
			setFilteredData(filtered)
		}else{
			setFilteredData([])
		}
	},[searchTerm,data])
	const handleInputChange = (event) => {
		setSearchTerm(event.target.value)
	}
	const handleSearch = () => {

	} 
	if (loading) return <p>Checking..</p>
	if (error) return <p>Error: {error.message}</p>
	return (
		<div className = 'main'>
			<h1>Check For Your Country : </h1>
			<input type = 'text' placeholder = 'Country Name' value={searchTerm} onChange = {handleInputChange}/>
			<button onClick = {handleSearch}>Check</button>
			{filteredData.length > 0 ? (	
				filteredData.map((satellite) => (
					<div key = {satellite.id} className = 'dis'>
						<span>Country : {satellite.country},</span>
						<span>Name : {satellite.id},</span>
						<span>Launcher : {satellite.launcher},</span>
						<span>Launch Date : {satellite.launch_date},</span>
						<span>Launch Date : {satellite.mass}</span>
					</div>
				))		
			):(
				searchTerm && <p>No satellites found for this {searchTerm}</p>
			)}
		</div>
	)
}


export default Center;