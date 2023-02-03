
export const response = (statusCode: number, message: string) => {
    return {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({message})
    }
}