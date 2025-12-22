import { useState } from 'react'
import './CSS/App.css'
import Header from './Cards/Header'
import Footer from './Cards/Footer'
import LeaderBoard from './LeaderBoard'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Cards/HomePage'
import NotFound from './Cards/NotFound'
import ProductCard from './Cards/ProductCard'
import Reviews from './Cards/Reviews'
import SearchBar from './Cards/SearchBar'
import Signup from "./Cards/Signup"
import Login from './Cards/Login'
import AddCafe from './Cards/AddCafe'
import CafeDashboard from './Cards/CafeDashBoard'
import DishReviewsPage from './Cards/DishReviews'
import AdminPanel from './Cards/AdminPanel'
import CreateCafe from './Cards/CreateCafe'
import EditCafeName from './Cards/EditCafeName'
import ManageImages from './Cards/ManageImages'
import AddDishes from './Cards/AddDishes'
import AddReview from './Cards/AddReview'
import DishReviewsUser from './Cards/DishReviewsUser'
import AlreadyReviewed from './Cards/AlreadyReviewed'

function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/LeaderBoard/:id" element={<LeaderBoard />} />
          <Route path="/addCafe" element={<AddCafe />} />
          <Route path="/cafeDashBoard" element={<CafeDashboard />} />
          <Route path="/product/searchMenu" element={<SearchBar />} />
          <Route path="/card/:id" element={<ProductCard />} />
          <Route path="/dishReviews/:id" element={<DishReviewsPage />} />
          <Route path="/product/LeaderBoard/card/:id/:dishId" element={<Reviews/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/adminPanel" element={<AdminPanel/>} />
          <Route path="/createCafe" element={<CreateCafe/>} />
          <Route path="/edit-cafe-name" element={<EditCafeName/>} />
          <Route path="/manage-images" element={<ManageImages/>} />
          <Route path="/add-dishes" element={<AddDishes/>} />
          <Route path="/add-review/:cafeId/:dishName" element={<AddReview/>} />
          <Route path="/dishReviews/:cafeId/:dishName" element={<DishReviewsUser/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer/>
    </>
  )
}

export default App