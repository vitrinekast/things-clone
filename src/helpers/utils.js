import firebase from "firebase"
import moment from 'moment'
import chrono from 'chrono-node'

const getDateDiff = (date) => {
    const currentDay = moment();
    return date ? currentDay.diff(moment.unix(date.seconds), 'days') : null
}
const generateID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const getTags = ( string ) => {
	const regex = new RegExp( /(#[a-zA-Z]+\b)(?!;)/gm );

	let matches = string.match( regex ) ? string.match( regex ) : [];
	matches = matches.map( match => match.replace( '#', '' ).trim() );

	return matches
}

const stripTags = ( string ) => {
	const matches = getTags(string)
  console.log({matches})
  matches.forEach((match) => {
    string = string.replace('#' + match, '')
  })

	return string
}

const parseTodo = (todo) => {
    console.log('refafctor this')
    var newTags = getTags(todo.text);
    const dateResult = chrono.parse(todo.text);

    newTags.forEach((tag) => {
        if(!todo.tags.includes(tag)) { todo.tags.push(tag) }
    })
    if(dateResult[0]) {
        todo.deadline = chrono.parseDate(todo.text)
        todo.text = todo.text.replace(dateResult[0].text, '');
    }
    todo.text = todo.text.trim();

    return todo
}

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

const filterByDate = ({ items, filters }) => {
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
        } else {
            results = results.filter((result) => {
                return result[filter] === filters[filter]
            })
        }
    })

    return results
}

export { stripTags, getDateDiff, generateID, parseTodo, baseTodo, filterByDate }
