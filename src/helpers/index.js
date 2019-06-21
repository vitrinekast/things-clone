import firebase from "firebase"
import moment from 'moment'
import chrono from 'chrono-node'

const getDateDiff = (date) => {
    const currentDay = moment();
    return date ? currentDay.diff(moment.unix(date.seconds), 'days') : null
}

const filterActions = {
  'done': ({list, value}) => {
    return list.filter(item => item.done === value)
  },
  'project': ({list, value}) => {
    return list.filter(item => item.project === value)
  },
  'deadline': ({list, value}) => {
    console.info("filter not yet implemented")
    return list
  },
  'today': ({list, value}) => {
    let today = new Date().setHours(0, 0, 0, 0)

    return list.filter((item) => {
        return new Date(item.deadline).setHours(0, 0, 0, 0) <= today
    })
  },
  'tomorrow': ({list, value}) => {
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0)

    return list.filter((item) => {
        return new Date(item.deadline).setHours(0, 0, 0, 0) == tomorrow
    })
  },
  'someday': ({list, value}) => {
    console.info("filter not yet implemented")
    return list
  },
  'tag': ({list, value}) => {
    console.log('todo tag')
    if(value) {
      return list.filter((item) => {
        if(item.tags) {
          return item.tags.indexOf(value) !== -1
        }
      })
    }
    return list
  }
}

const filterTodo = (list, filters) => {
  ;
    Object.keys(filters).forEach((filter) => {
      list = filterActions[filter]({list, value: filters[filter]});
    })

    return list
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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const getTags = (string, ogTags) => {
  
    const regex = new RegExp(/(#[a-zA-Z]+\b)(?!;)/gm);
    const newTags = string.match(regex) ? string.match(regex) : [];
    let oldTags = [];
    
    if(Array.isArray(ogTags ? ogTags : false)) {
      oldTags = ogTags
    }
    return oldTags.concat(newTags)
}

const stripTags = (string) => {
    const matches = getTags(string)
    matches.forEach((match) => {
        string = string.replace('#' + match, '')
    })

    return string
}

const parseTodo = (todo) => {
    todo.text = todo.text.trim();
    const dateResult = chrono.parse(todo.text);
    todo.deadline = dateResult[0] ? chrono.parseDate(todo.text) : todo.deadline
    todo.tags = getTags(todo.text, Object.values(todo.tags));
    todo.notes = todo.notes ? todo.notes : false
    return todo
}

const baseTag = (item) => {
    let base = {
        id: generateID(),
        created: new Date(),
        userId: '2WpuEc3jqYdnJXZbb5RjyPUa5AI2',
        text: '',
        todos: []
    }
    
    return  { ...base, ...item };
};

const baseTodo = (state, payload) => {
    // const tag = store.state.todos.filters.tag;
    // const project = store.state.todos.filters.project
    return {
        userId: payload.userId,
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
    const userId = '2WpuEc3jqYdnJXZbb5RjyPUa5AI2';

    return {
        userId: userId,
        id: generateID(),
        title: "",
        done: false,
        todos: [],
        notes: "",
        deadline: false,
        created: firebase.firestore.FieldValue.serverTimestamp(),
    }
};


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
            ref = ref.where("deadline", "==", "someday")
        } else if(filter === "tag") {
            console.info('TODO: tagid', filter, filters[filter])
            ref = ref.where("tags", "array-contains", filters[filter])
        } else {
            console.info('TODO: fallback')
        }
    })

    return ref
}

export { baseTag, baseProject, filterQuery, emptyProject, addItemToArray, isDescendant, stripTags, getDateDiff, generateID, parseTodo, baseTodo, filterTodo }
