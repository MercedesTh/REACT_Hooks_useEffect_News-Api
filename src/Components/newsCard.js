import React, { useState, useEffect } from 'react';
import './newsCard.css';

const NewsCard = () => {

    const [newsType, setNewsType] = useState('apple')
    const [newsArr, setNewsArr] = useState([])

    useEffect(() => {
        let loaded = true
        console.log('Content got rendert again');

        fetch(`https://newsapi.org/v2/everything?q=${newsType}&language=en&sortBy=publishedAt&apiKey=9087db9b54214711b78af94861458b2f`)
            .then(response => response.json())
            .then(json => {
                if (loaded) {
                    console.log(json.articles)
                    setNewsArr(json.articles)
                }
            })

        return () => {
            loaded = false;
            console.log('process stopped')
        }

    }, [newsType])

    return (
        <>
            <section>
                <article className="middle">
                    <button onClick={() => { setNewsType('apple') }}>Apple</button>
                    <button onClick={() => { setNewsType('tesla') }}>Tesla</button>
                </article>

                <div className="flex">
                    {newsArr.map((items) => (
                        <article className="cards">
                            <img src={items.urlToImage} alt="pic" />
                            <h1>{items.title}</h1>
                            <p>{items.description}</p>
                            <p>{items.publishedAt}</p>
                            <a href={items.url}>Read More</a>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}

export default NewsCard
