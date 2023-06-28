import React, {useState, useEffect} from 'react'
import ItemCar from '../components/ItemCar'
 import ReactPaginate from 'react-paginate'
import Button_Add_Car from '../components/features/Button_Add_Car'

const CarList = ()  => {

	    let [cars,setCars] = useState([])
        const [loading, setLoading] = useState(false);
        const [minPages, setMinPages] = useState(0);
        let [current_Page, setCurrentPage] = useState(1); // Added state for current page
        const [totalPages, setTotalPages] = useState(0); // Added state for total pages

	    useEffect(() => {

        setLoading(true);
        fetch(`/first_app/cars/pagination/?page=${current_Page}&per_page=10`) // Updated API endpoint with pagination parameters
        .then((response) => response.json())
        .then((data) => {
        setCars(data.cars);
        setTotalPages(Math.floor(data.total_count%10==0?data.total_count/10 : data.total_count/10+1 ));
        setLoading(false);
            });


	    }, [current_Page])


        const handlePageChange = (event) => {
            setCurrentPage(event.selected+1)


        };
        if (loading) {
          return (
             <div>loading</div>
         );
         }

	    return (
		<div className="notes">
		<h1>Cars</h1>
		<Button_Add_Car/>
		<table>
		<tbody>
			<tr>
				<th>id</th>
				<th>name</th>
				<th>price</th>
				<th>year</th>
				<th>carType</th>

			</tr>
				{cars.map((car, index) =>
				(<ItemCar   key={index} car={car}/>))  }
				</tbody>
		</table>
      <ReactPaginate
        disableInitialCallback={ true }
        initialPage={ current_Page-1 }
        pageCount={totalPages}
        marginPagesDisplayed={4}
        pageRangeDisplayed={4}
        onPageChange={handlePageChange}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
		</div>
		)
};
export default CarList