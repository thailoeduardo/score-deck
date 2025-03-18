<button {{ $attributes->merge(['type' => 'submit', 'class' => 'btn btn-soft btn-info']) }}>
    {{ $slot }}
</button>
