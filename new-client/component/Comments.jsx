import React, { useState, useEffect } from "react";


export default function Comments({ticketId}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const[fetchData, setFetchData] = useState(false);
    const [saveTicketId, setSaveTicketId] = useState(ticketId);
    const [headers, setHeaders] = useState({});



    useEffect(() => {

        const token = localStorage.getItem('token');
        setHeaders({
            'Content-Type': 'application/json',
            'Authorization': `ksklkweiowekdl908w03iladkl ${token}`
        });
        
        if (ticketId) {
            setSaveTicketId(ticketId);
            localStorage.setItem('ticketId', ticketId);
        } else {
            const savedTicketId = localStorage.getItem('ticketId');
            if (savedTicketId) {
                setSaveTicketId(savedTicketId);
            }
        }    

        if(saveTicketId) {
        
        fetch(`http://192.168.0.26:5000/ticket/comments?ticket_id=${ticketId}`, { headers: headers })
            .then(res => res.json())
            .then(data => setComments(data.comments));

        }
    }, [ticketId,fetchData]);

    const handleDetelete = async (event) => {
        const id = event.currentTarget.dataset.id;


        const comment = {
            id: id,
            ticket_id:saveTicketId
        }

        let response  = await fetch(`http://192.168.0.26:5000/ticket/comment/delete`, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(comment)

        });

        if(response.ok){
            setFetchData(!fetchData);
        }
        else{
        }

    }


    const handleComment = (event) => {
        setComment(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const commentData = {
            text: comment,
            ticket_id: saveTicketId
        }

        let response = await fetch(`http://192.168.0.26:5000/ticket/comment`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(commentData)
        });

        if (response.ok) {
            setFetchData(!fetchData);
        }
        else {
        }
    }






    return (
        <div class="mt-5">
            <h2>Comments</h2>
            <hr />
            <div class="row">
                <div class="col">
                    <div className="row shadow-lg h-100">

                        <div class="comment-list col-md-6">
                            <div className="comments overflow-scroll">
                                {
                                    comments.map((comment) => {
                                        return (
                                            <div class="comment">
                                                <div class="comment-header">
                                                    <h4 class="comment-author">{comment.username}</h4>
                                                    <span class="comment-date">{comment.date_range}</span>
                                                </div>
                                                <div class="comment-body">
                                                    <p>{comment.text}</p>
                                                </div>
                                                <button data-id={comment.id} className="btn position-absolute" onClick={handleDetelete}> <i className="bi bi-trash text-danger"></i></button>
                                            </div>
                                        )
                                    })
                                }
                               
                            </div>
                           
                        </div>
                        <div class="comment-form col-md-6">
                            <h4>Leave a Comment</h4>
                            <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label for="comment">Comment</label>
                                    <textarea minLength={1} maxLength={150} onChange={handleComment} class="form-control" id="comment" rows="5" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary align-seft-end">Submit</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}