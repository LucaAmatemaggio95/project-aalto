import { Container } from '@mui/material'
import './Content.scss';
import React, { useEffect, useState } from 'react'
import FIltersCard from './FiltersCard/FIltersCard';
import ResultCard from './ResultCard/ResultCard';
import { Filters, Todo } from '../../models/Todo';
import axios from 'axios';

const Content = () => {

    const [list, setList] = useState<Todo[]>([]);
    const [filteredList, setFilteredList] = useState<Todo[]>([]);
    const [activeList, setActiveList] = useState<Todo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [usersList, setUsersList] = useState<number[]>([]);

    const count = Math.floor((filteredList.length / 5));

    const updateCurrentPage = (newPage:number) => {

        setCurrentPage(newPage);
        const pageSize = 5;
        setActiveList(filteredList.slice((newPage - 1) * pageSize, newPage * pageSize));

    }

    const searchIncomplete = (filters:Filters) => {

        let tmp_list:Todo[] = [...list];

        if (filters.notCompleted) {
            tmp_list = tmp_list.filter(item => !item.completed)
        }

        if (filters.userIdFilter !== "") {
            const user_selected = Number(filters.userIdFilter);
            tmp_list = tmp_list.filter(item => item.userId === user_selected);
        }

        if (filters.titleFilter !== "") {
            tmp_list = tmp_list.filter(item => item.title.toLowerCase().indexOf(filters.titleFilter.toLowerCase()) > -1)
        }

        setFilteredList(tmp_list);
        updateCurrentPage(1);
        setActiveList(tmp_list.slice(0,5));

    }

    useEffect(() => {

        axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        .then(res => {
            setList(res.data);

            const distinct_users = [...new Set(res.data.map(item => item.userId))];

            setUsersList(distinct_users);

        })
        .catch(err => console.log(err));

        return () => {}

    }, []);

    useEffect(() => {

        if (list.length > 0) {
            setFilteredList(list);
            setActiveList(list.slice(0,5));
        }

    }, [list]);

    return (
        <div className='Wrapper'>
            <Container className="Content">
                
                <div className="FiltersContainer">
                    <FIltersCard
                        distinctUsers={usersList}
                        searchIncomplete={searchIncomplete}
                    />
                </div>

                <ResultCard 
                    count={count}
                    list={activeList}
                    currentPage={currentPage}
                    updateCurrentPage={updateCurrentPage}
                />

            </Container>
        </div>
    )
}

export default Content