
const BootstrapButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#0063cc',
      borderColor: '#0063cc',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
  })(Button);

  body {
	font-family: sans-serif;
}

.react-list-select {
	display: inline-block;
	position: relative;
	outline: none;
}

.react-list-select--item {
	padding: 0.3em 0.6em;
	cursor: pointer;
	position: relative;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;
	user-select: none;
}

.react-list-select--item.is-selected {
	-webkit-user-select: inherit;
	-moz-user-select: inherit;
	-ms-user-select: inherit;
	-o-user-select: inherit;
	user-select: inherit;
}

.react-list-select--item.is-disabled {
	cursor: default;
}

ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

body {
	padding: 3em;
}

.demo > div {
	display: inline-block;
	vertical-align: top;
	margin-right: 1.5em;
}

/* Add some style to the list */

.react-list-select {
	background: #fafafa;
	border: 1px solid #cacaca;
	margin-right: 0.5em;
}
.react-list-select--item.is-selected {
	background: #d7e7ff;
}
.react-list-select:focus .react-list-select--item.is-focused::before,
.react-list-select:focus .react-list-select--item.is-focused::after {
	content: '';
	position: absolute;
	top: 0;
	bottom: 0;
	width: 2px;
	background: #79b9ff;
}
.react-list-select:focus .react-list-select--item.is-focused::before {
	left: 0;
}
.react-list-select:focus .react-list-select--item.is-focused::after {
	right: 0;
}
.react-list-select--item.is-disabled {
	color: #afafaf;
}

.context-menu .react-list-select {
	padding: 0.3em 0;
}
.context-menu .react-list-select--item {
	font-size: 0.8125em;
}

/* Component in list - last example */

.contact {
	padding: 0.5em;
}
.contact .email {
	font-size: 0.675em;
	color: #999;
}
