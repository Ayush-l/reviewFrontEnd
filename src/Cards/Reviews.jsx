import React from 'react'
import ReviewCard from './ReviewCard'
import AddReview from './AddReview'
import Pagination from './Pagination'
import { useState } from 'react'

const Reviews = () => {
  const [currPage,changeCurrPage]=useState(1)
  const [totalPages,changeTotalPages]=useState(20)
  const [cafeName,changeCafeName]=useState("The Coffee House")
  const [dishName,changeDishName]=useState("Cappuccino")
  const onChange=(page)=>{
    changeCurrPage(page)
  }

  const reviews=[
    {
      name:"John Doe",
      rating:4,
      comment:"Great dish! Really enjoyed having it.",
    },
    {
      name:"Jane Smith",
      rating:2,
      comment:"Not a good dish",
    },
    {
      name:"John",
      rating:5,
      comment:"totally worth it",
    },
    {
      name:"Doe",
      rating:1,
      comment:"Waste of money",
    },
    {
      name:"Doe",
      rating:1,
      comment:"Waste of money",
    },
    {
      name:"Doe",
      rating:1,
      comment:"Waste of money",
    },
  ]
  return (
    <>
      <div>
        <h1 style={{textAlign:"center", marginTop:"20px"}}>Reviews for {dishName} at {cafeName}</h1>
      </div>
      <AddReview/>
      <div style={{display:"flex", flexWrap:"wrap", gap:"40px", justifyContent:"center", marginTop:"20px"}}>
        {
          reviews.map((review,index)=>(
            <ReviewCard key={index} name={review.name} rating={review.rating} comment={review.comment}/>
          ))
        }
      </div>
      <Pagination totalPages={totalPages} currentPage={currPage} onPageChange={onChange}/>
    </>
  )
}

export default Reviews
