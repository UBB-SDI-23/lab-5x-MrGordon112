import React, {useState, useEffect} from 'react'
import ItemCarType from '../components/ItemCarType'
 import ReactPaginate from 'react-paginate';
import Button_Filter	from '../components/features/Button_Filter'
import Button_Add_CarType	from '../components/features/Button_Add_CarType'
const CarTypeList = ()  => {

	    let [carTypes,setCarTypes] = useState([])
        const [loading, setLoading] = useState(false);
        const [minPages, setMinPages] = useState(0);
        let [current_Page, setCurrentPage] = useState(1); // Added state for current page
        const [totalPages, setTotalPages] = useState(0); // Added state for total pages

	    useEffect(() => {

        setLoading(true);
        fetch(`/first_app/carTypes/pagination/?page=${current_Page}&per_page=10`) // Updated API endpoint with pagination parameters
        .then((response) => response.json())
        .then((data) => {
        setCarTypes(data.carTypes);
        setTotalPages(Math.floor(data.total_count%10===0?data.total_count/10 : data.total_count/10+1 ));
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
		<Button_Filter/>
		<Button_Add_CarType/>
			<h1>CarTypes</h1>
		<table>
		<tbody>
			<tr>
				<th>id</th>
				<th>name</th>
				<th>revenue $</th>
				<th>nationality</th>
				<th>start year</th>
			</tr>

			{carTypes.map((carType, index) =>
			(<ItemCarType   key={index} carType={carType}/>))  }
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
export default CarTypeList