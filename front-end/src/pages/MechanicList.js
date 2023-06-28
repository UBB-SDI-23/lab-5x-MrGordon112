import React, {useState, useEffect} from 'react'
import ItemMechanic from '../components/ItemMechanic'
import Button_Add_Mechanic from '../components/features/Button_Add_Mechanic'
import ReactPaginate from 'react-paginate';

const MechanicList = ()  => {
    
	 let [mechanics,setMechanics] = useState([])
        const [loading, setLoading] = useState(false);
        const [minPages, setMinPages] = useState(0);
        let [current_Page, setCurrentPage] = useState(1); // Added state for current page
        const [totalPages, setTotalPages] = useState(0); // Added state for total pages

	    useEffect(() => {

        setLoading(true);
        fetch(`/first_app/mechanics/pagination/?page=${current_Page}&per_page=10`) // Updated API endpoint with pagination parameters
        .then((response) => response.json())
        .then((data) => {
        setMechanics(data.mechanics);
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
			<Button_Add_Mechanic/>
		<h1>Mechanics</h1>
		<table>
		<tbody>
		<tr>
				<th>id</th>
				<th>name</th>
				<th>experience</th>
				<th>price</th>
				<th>age</th>
			</tr>

		{mechanics.map((mechanic, index) =>
		(<ItemMechanic key={index} mechanic={mechanic}/>))  }
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
export default MechanicList  