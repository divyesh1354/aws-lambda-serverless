interface DonationInput {
    id?: string
    name: string
    email: string
    mobile: string
    amount: number
}

export const createDonationValidation = (data : DonationInput) => {
    var phoneNoRegex = /^\d{10}$/;
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!data.name) {
        return { status: true, message:'Name field is required'}
    } else if (!data.mobile){
        return { status: true, message:'Mobile number field is required'}
    } else if (data.mobile && !data.mobile.match(phoneNoRegex)){
        return { status: true, message:'Mobile number must be valid'}
    } else if (data.email && !data.email.match(emailRegex)){
        return { status: true, message:'Email field is required and must be valid'}
    } else if (!data.amount && data.amount < 1){
        return { status: true, message:'Amount field required ans must be valid number'}
    }
    return {status: false, message: ''};
}
