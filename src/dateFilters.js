const dateFilters = ( type, attr ) => {
	switch ( type ) {

	case 'Log':
		return {
			project: false,
			tag: false,
			noProject: false,
			date: false,
			noDate: false,
			unfinished: true,
		};
		break;
	case 'Inbox':
		return {
			noProject: true,
			noDate: true,
			unfinished: true,
			project: false,
			tag: false,
			date: false,
		};
		break;
	case 'Project':
		return {
			project: attr,
			noProject: false,
			noDate: false,
			unfinished: true,
			tag: false,
			date: false,
		};
		break;
	case 'Someday':
		return {
			noProject: false,
			noDate: false,
			unfinished: true,
			date: 'someday',
			project: false,
			tag: false,
		};
		break;
	case 'Today':
		return {
			noProject: false,
			date: 'today',
			project: false,
			tag: false,
			noDate: false,
			unfinished: true,
		};
		break;
	case 'Tomorrow':
		return {
			noProject: false,
			noDate: false,
			unfinished: true,
			date: 'tomorrow',
			project: false,
			tag: false
		}
	}
}


export default dateFilters;
