@props(['active' => false])

@php
$classes = ($active ?? false)
            ? 'dock-active'
            : '';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }} >
    {{ $slot }}
</a>
