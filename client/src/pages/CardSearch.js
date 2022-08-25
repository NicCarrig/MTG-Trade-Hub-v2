import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Inventory from '../components/Inventory';
import { fetchSearchCard } from '../utils/searchCard';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import Header from '../components/Header';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';


const CardSearch = (props) => {

    const HandleFormSubmit = async (event) => {

        event.preventDefault();

        const card = document.querySelector("#searchedCard").value
        console.log(card);


    };
    const [cards, setCards] = useState(null);

    useEffect(() => {
        fetch(`https://api.scryfall.com/cards/search?q=angel`)
            .then(res => {
                return res.json()
            })
            .then((data) => {
                displayCards(data);
            })
    }, [])

    const displayCards = (searchData) => {
        console.log(searchData)

        const cardSearchContainerEl = document.getElementById('card-search-container')

        let cardWrapperEl = document.createElement('div');
        cardWrapperEl.setAttribute("class", "card-wrapper");
        cardSearchContainerEl.appendChild(cardWrapperEl);

        for (let i = 0; i < searchData.data.length; i++) {
            //<div class="card-container">
            let singleCardContainerEl = document.createElement('div');
            singleCardContainerEl.setAttribute("class", "card-container");
            cardWrapperEl.appendChild(singleCardContainerEl);

            let searchTitleEl = document.createElement('h2');
            searchTitleEl.textContent = `Search Results`;
            cardSearchContainerEl.appendChild(searchTitleEl);

            //check for double face card
            let img_uri;
            if (searchData.data[i].card_faces) {
                img_uri = searchData.data[i].card_faces[0].image_uris.normal;
            }
            else {
                img_uri = searchData.data[i].image_uris.normal;
            }
            //<img src="{{img_uri}}" alt="image of {{card_name}}">
            let cardImg = document.createElement('img');
            cardImg.setAttribute("src", img_uri);
            cardImg.setAttribute("alt", `image of ${searchData.data[i].name}`);
            cardImg.setAttribute("data-name", searchData.data[i].name);
            singleCardContainerEl.appendChild(cardImg);

            //<p>{{card_name}}</p>
            let cardNameEl = document.createElement('p');
            cardNameEl.textContent = searchData.data[i].name;
            cardNameEl.setAttribute("data-name", searchData.data[i].name);
            singleCardContainerEl.appendChild(cardNameEl);

            //<button type="button" class="add-card-btn" data-name="{{card_name}}">Remove card</button>
            let addCardBtn = document.createElement('button');
            addCardBtn.setAttribute("type", "button");
            addCardBtn.setAttribute("class", "add-card-btn");
            addCardBtn.setAttribute("data-name", searchData.data[i].name);
            addCardBtn.textContent = 'Add Card';
            singleCardContainerEl.appendChild(addCardBtn);

        }
    }

    return (
        <div>
            <Header />
            <div className="d-flex justify-content-center">
                <form onSubmit={HandleFormSubmit} className="flex-row justify-center ">
                    <textarea id="searchedCard" className="form-textarea search-textarea" placeholder='Search for a card'></textarea>
                    <button className='searchbtn'>Search</button>
                </form>
            </div>
            <div id="card-search-container">

            </div>
        </div>
    );
};

export default CardSearch;