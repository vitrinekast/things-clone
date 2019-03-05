const dateFilters = ( type, attr ) => {
	console.log( 'dateFilters', type, attr )

	if( type === 'Log' ) {
		return {
			project: undefined,
			tag: undefined,
			date: undefined,
			done: false
		};
	} else if( type === 'Inbox' ) {
		return {
			done: false,
			project: false,
			tag: undefined,
			date: false,
		};
	} else if( type === 'Project' ) {
		return {
			project: attr,
			done: false,
			tag: undefined,
			date: undefined,
		};
	} else if( type === 'Someday' ) {
		return {
			done: false,
			date: 'someday',
			project: undefined,
			tag: undefined,
		};
	} else if( type === 'Today' ) {
		return {
			date: 'today',
			project: undefined,
			tag: undefined,
			done: false,
		};
	} else if( type === 'Tomorrow' ) {
		return {
			done: false,
			date: 'tomorrow',
			project: undefined,
			tag: undefined
		}
	} else {
		return {}
	}

}


export default dateFilters;
