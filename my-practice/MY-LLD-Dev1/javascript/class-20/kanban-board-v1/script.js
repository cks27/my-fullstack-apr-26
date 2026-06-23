// status = Todo | InProgress | Done
function uuid() {
    // get the dynamic uuid
    return crypto.randomUUID();
}

const tasks = [
    {
        desc: "Fixed API Timeout",
        status: "Todo",
        priority: "pink",
        id: uuid(),
        dateCreated: new Date().toISOString()

    },
    {
        desc: "Build Autopayment flow",
        status: "InProgress",
        priority: "pink",
        id: uuid(),
        dateCreated: new Date().toISOString()

    },
    {
        desc: "Build a auto debit cron",
        status: "Done",
        priority: "pink",
        id: uuid(),
        dateCreated: new Date().toISOString()

    }
]

console.log(tasks);