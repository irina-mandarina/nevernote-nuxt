export const useUsername = () => {
    return useState('username', () => 'alex')
}

export const usePassword = () => {
    return useState('password', () => 'alex1')
}

export const useName = () => {
    return useState('name', () => 'Alex')
}