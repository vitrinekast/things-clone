import firebase from "firebase"
import moment from 'moment'
import chrono from 'chrono-node'

const getDateDiff = (date) => {
    const currentDay = moment();
    return date ? currentDay.diff(moment.unix(date.seconds), 'days') : null
}

const addItemToArray = (array, newItem) => {
    if(array.indexOf(newItem) === -1) {
        array.push(newItem)
    }
    return array;
}

const emptyProject = {
    resource: 'projects',
    id: false,
    item: {
        '.key': false,
        noProject: true
    }
}

const isDescendant = ({ parent, child }) => {
    var node = child.parentNode;
    while(node != null) {
        if(node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

const generateID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const getTags = (string) => {
    const regex = new RegExp(/(#[a-zA-Z]+\b)(?!;)/gm);

    let matches = string.match(regex) ? string.match(regex) : [];
    matches = matches.map(match => match.replace('#', '').trim());


    return matches
}

const stripTags = (string) => {
    const matches = getTags(string)
    matches.forEach((match) => {
        string = string.replace('#' + match, '')
    })

    return string
}

const parseTodo = (todo) => {
    console.log('refafctor this')

    todo.text = todo.text.trim();
    const dateResult = chrono.parse(todo.text);
    todo.deadline = dateResult[0] ? chrono.parseDate(todo.text) : todo.deadline
    todo.tags = getTags(todo.text);

    return todo
}

const baseTag = (text, todoId) => {
    return {
        id: generateID(),
        text: text,
        todos: [todoId]
    }
};

const baseTodo = (state, payload) => {
    const userId = '';
    // const tag = store.state.todos.filters.tag;
    // const project = store.state.todos.filters.project
    return {
        userId: userId,
        id: generateID(),
        text: payload.text,
        done: false,
        notes: false,
        project: false,
        tags: [],
        deadline: payload.deadline,
        created: firebase.firestore.FieldValue.serverTimestamp(),
    }
};


const baseProject = () => {
    // const userId = store.state.user.user.uid
    const userId = '';

    return {
        userId: userId,
        id: ID(),
        title: "",
        done: false,
        todos: [],
        notes: "",
        deadline: false,
        created: firebase.firestore.FieldValue.serverTimestamp(),
    }
};

const filterTodo = ({ items, filters }) => {
    let results = items;

    Object.keys(filters).forEach((filter) => {
        if(filter === "today") {
            results = results.filter((result) => {
                const diff = getDateDiff(result.deadline)
                return diff !== null ? diff >= 0 : false
            })
        } else if(filter === "tomorrow") {
            results = results.filter((result) => {
                const diff = getDateDiff(result.deadline)
                return diff !== null ? diff < 0 : false
            })
        } else if(filter === "tagId") {
            results = results.filter((result) => {
                return result.tags.includes(filters[filter])
            })
        } else {
            results = results.filter((result) => {
                return result[filter] === filters[filter]
            })
        }
    })
    return results
}

const filterQuery = (ref, filters) => {


    Object.keys(filters).forEach((filter) => {
        if(filter === "done") {
            ref = ref.where("done", "==", filters[filter])
        } else if(filter === "project") {
            ref = ref.where("project", "==", filters[filter])
        } else if(filter === "deadline") {
            ref = ref.where("deadline", "==", filters[filter])
        } else if(filter === "today") {
            let today = new Date()
            ref = ref.where("deadline", "<", today)
        } else if(filter === "tomorrow") {
            let today = new Date()
            ref = ref.where("deadline", ">", today)
        } else if(filter === "someday") {
            ref = ref.where("deadline", "===", "someday")
        } else if(filter === "tag") {
            console.log('TODO: tagid', filter, filters[filter])
            ref = ref.where("tags", "array-contains", filters[filter])
        } else {
            console.log('TODO: fallback')
        }
    })

    return ref
}

export { getTagsFromString, baseTag, baseProject, filterQuery, emptyProject, addItemToArray, isDescendant, stripTags, getDateDiff, generateID, parseTodo, baseTodo, filterTodo }
