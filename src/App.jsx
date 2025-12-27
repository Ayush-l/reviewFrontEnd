import { useState } from 'react'
import './CSS/App.css'
import Header from './Cards/Header'
import Footer from './Cards/Footer'
import LeaderBoard from './LeaderBoard'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Cards/HomePage'
import NotFound from './Cards/NotFound'
import ProductCard from './Cards/ProductCard'
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

function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/leaderboard/:id" element={<LeaderBoard />} />
          <Route path="/product/searchmenu" element={<SearchBar />} />
          <Route path="/card/:id" element={<ProductCard />} />
          <Route path="/dishreviews/:id" element={<DishReviewsPage />} />
          <Route path="/dishreviews/:cafeId/:dishName" element={<DishReviewsUser />} />
          <Route path="/add-review/:cafeId/:dishName" element={<AddReview />} />
          <Route path="/addcafe" element={<AddCafe />} />
          <Route path="/cafedashboard" element={<CafeDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/createcafe" element={<CreateCafe />} />
          <Route path="/edit-cafe-name" element={<EditCafeName />} />
          <Route path="/manage-images" element={<ManageImages />} />
          <Route path="/add-dishes" element={<AddDishes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer/>
    </>
  )
}

export default App