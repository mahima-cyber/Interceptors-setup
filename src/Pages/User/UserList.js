import React, { useState, useEffect } from 'react'
import { Api } from '../../Service/Api';
import { postUrl } from '../../Service/ApiEndpoints';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUser, updateUser } from '../../Redux/Slice/UserSlice';

const UserList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const getUserList = useSelector((state) => state?.users?.getApi)
    const deleteUserrr = useSelector((state) => state?.users?.getDelete)
    const [deleteData, setDeleteData] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        setIsLoading(false)
        fetchData()
    }, [])

    useEffect(() => {
        if (deleteUserrr) {
            dispatch(getUser())
        }
    }, [deleteUserrr])

    const fetchData = async () => {
        const body = {
            name: 'Deepak',
            email: 'test@gamil.com',
            phone: '6754475',
            lastname: 'dggfg'
        }
        dispatch(getUser(body))
    }

    const handleClick = () => {
        const data = {
            title: 'mahima',
            body: 'bar',
            userId: 121,
        }
        const api = new Api();
        api.post(postUrl, data);
    }

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    }

    const handleUpdate = (body) => {
        dispatch(updateUser(body))
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>avatar</th>
                        <th>name</th>
                        <th>city</th>
                        <th>country</th>
                        <th style={{ textAlign: "center" }} colSpan={2}>Action</th>
                    </tr>
                </thead>
                {getUserList ? getUserList?.map((item) => (
                    <tbody>
                        <tr>
                            <td>{item.id}</td>
                            <td><img src={item.avatar} alt="Girl in a jacket" width="50" height="50" /></td>
                            <td>{item.name}</td>
                            <td>{item.city}</td>
                            <td>{item.country}</td>
                            <td>
                                <Button type="submit" variant="primary" label="Delete" onClick={() => handleDelete(item.id)}>Delete</Button>
                            </td><td>
                                <Button type="submit" variant="primary" label="Delete" onClick={() => handleUpdate(item)}>Update</Button>
                            </td>
                        </tr>
                    </tbody>
                )) : ""}
            </Table>
            <Button
                variant='primary'
                onClick={() => handleClick()}
            >
                Add User
            </Button>
        </>
    )
}
export default UserList;