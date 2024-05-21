const GET = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/user/profile', {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3VzZXIvbG9naW4iLCJpYXQiOjE3MTYyODIyODIsImV4cCI6MTcxNjI4NTg4MiwibmJmIjoxNzE2MjgyMjgyLCJqdGkiOiJzSW5oanA0Z2p1U2tTVTc4Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.T4frq-ZrkYk6LA0JSWrRiLixpUF61wVunobMl7_kpW4`
        },
    });
    const data = await response.json();
    return Response.json({ data } as any)
}

export { GET };