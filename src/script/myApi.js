// An API class for testing my filtering
export class MyAPI {

    async getData() {
        const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
        const data = await res.json();

        return data;
    }
}
