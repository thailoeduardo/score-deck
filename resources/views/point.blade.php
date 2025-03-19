<x-app-layout>
    <x-slot name="header">
        <h2 class="text-center text-xl text-gray-200 leading-tight">
            {{ __('editar pontos') }}
        </h2>
    </x-slot>

    {{-- {{ dd($points) }} --}}

    {{-- {{ dd($usersRoom) }} --}}

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xs sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">

                    {{-- @if ((!$usersRoom->isEmpty() || $usersRoom->count() >= 2) && !$room->is_closed) --}}

        <form action="/room/{{$room->id}}/point/{{ $points->id }}" method="post" class="mt-4">
            @csrf
            @method('PATCH')

            <fieldset class="fieldset w-full">
                <legend class="fieldset-legend">Selecionar jogador</legend>
                <select name="user_id" id="user_id" class="w-full select @error('user_id') border-red-500 @enderror">
                    <option disabled selected>Jogador</option>
                    @foreach($usersRoom as $user)
                    <option value="{{ $user->id }}" {{ old('user_id') == $user->id ? 'selected' : '' }}>
                        {{ $user->name }}
                    </option>
                    @endforeach
                </select>
            </fieldset>

            @error('user_id')
                <p class="text-red-500 text-xs mt-2">{{ $message }}</p>
            @enderror

            <fieldset class="fieldset w-full">
                <legend class="fieldset-legend">Pontos</legend>
                <input type="text" name="points" id="points" class="w-full input @error('points') border-red-500 @enderror" placeholder="Pontos" value="{{ $points->points }}" />
            </fieldset>

            @error('points')
                <p class="text-red-500 text-xs mt-2">{{ $message }}</p>
            @enderror

            <x-primary-button class="w-full mt-5">{{ __('Atualizar pontos') }}</x-primary-button>
        </form>

        <form method="POST" action="/point/{{ $points->id }}" >
            @csrf
            @method('DELETE')

            <buttom type="submit" class="btn btn-soft btn-error w-full px-2">
                Apagar
            </buttom>
        </form>

{{-- @endif --}}



                </div>
            </div>
        </div>
    </div>
</x-app-layout>
