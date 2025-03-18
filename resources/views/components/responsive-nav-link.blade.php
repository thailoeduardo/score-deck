@props(['active'])

@php
$classes = ($active ?? false)
            ? ''
            : 'text-gray-400 hover:text-gray-200 focus:outline-hidden focus:text-gray-200 transition duration-150 ease-in-out';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>
