<template>
<div class="home">
    <header>
        <h2>Styleguide</h2>
    </header>

    <code>typography</code>

    <h1>This is heading 1</h1>
    <h2>This is heading 2</h2>
    <h3>This is heading 3</h3>
    <h4>This is heading 4</h4>
    <h5>This is heading 5</h5>
    <h6>This is heading 6</h6>
    <p>This is a paragraph</p>
    <label for="">This is a label</label>
    <blockquote cite="http://www.worldwildlife.org/who/index.html">
For 50 years, WWF has been protecting the future of nature. The world's leading conservation organization, WWF works in 100 countries and is supported by 1.2 million members in the United States and close to 5 million globally.
</blockquote>
<ol>
    <li>This is a listitem</li>
    <li>This is a listitem</li>
    <li>This is a listitem</li>
    <li>This is a listitem</li>
</ol>
<ul>
    <li>This is a listitem</li>
    <li>This is a listitem</li>
    <li>This is a listitem</li>
    <li>This is a listitem</li>
</ul>
<form class="" action="index.html" method="post">
    <fieldset>
        <input type="text" name="" value="" placeholder='text'>
        <input type="password" name="" value="" placeholder='password'>
        <input type="search" name="" value="" placeholder='search'>
        <input type="email" name="" value="" placeholder='email'>
        <input type="date" name="" value="" placeholder='date'>
        <input type="radio" name="" value="" placeholder='radio'>
        <input type="checkbox" name="" value="" placeholder='checkbox'>
        <input type="submit" name="" value="submit">

    </fieldset>
</form>

<h2>Components</h2>
Inline Tags
todo item
todo item active




</div>
</template>

<script>
// @ is an alias to /src
//
import Calendar from '@/components/Calendar';
import Notification from '@/components/Notification';
import TodoList from '@/components/TodoList';
import NavigationTags from '@/components/NavigationTags';

export default {
    name: 'home',
    components: {
        Calendar,
        NavigationTags,
        Notification,
        TodoList
    }
}
</script>
