import React, {useState, useEffect} from 'react'
import ItemRepaired from '../components/ItemRepaired'
 import ReactPaginate from 'react-paginate';
import Button_Add_Repaired from '../components/features/Button_Add_Repaired'

const RepairedList = ()  => {
    
	 let [repaireds,setRepaireds] = useState([])
        const [loading, setLoading] = useState(false);
        const [minPages, setMinPages] = useState(0);
        let [current_Page, setCurrentPage] = useState(1); // Added state for current page
        const [totalPages, setTotalPages] = useState(0); // Added state for total pages

	    useEffect(() => {

        setLoading(true);
        fetch(`/first_app/repaireds/pagination/?page=${current_Page}&per_page=10`) // Updated API endpoint with pagination parameters
        .then((response) => response.json())
        .then((data) => {
        setRepaireds(data.repaireds);
        setTotalPages((data.total_count/10 ));
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
		<h1>Repaireds</h1>
		<Button_Add_Repaired/>
		<table>
		<tbody>
		<tr>
				<th>id</th>
				<th>id car</th>
				<th>name car</th>
				<th>id mechanic</th>
				<th>name mechanic</th>
				<th>date</th>
				<th>price $</th>
			</tr>
		{repaireds.map((repaired, index) =>
		(<ItemRepaired   key={index} repaired={repaired}/>))  }
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

export default RepairedList  