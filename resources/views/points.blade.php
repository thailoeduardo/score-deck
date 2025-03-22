<x-app-layout>
    <x-slot name="header">
        <h2 class="text-center text-xl text-gray-200 leading-tight">
            {{ __('Atualizar pontos') }}
        </h2>
    </x-slot>

    <div class="flex min-h-[6rem] max-w-4xl min-w-[18rem] flex-wrap items-center justify-center gap-2 overflow-x-hidden mx-auto mb-8">
        <div class="w-full max-w-lg">

            <form action="/points/{{ $points->id }}/room/{{$room->id}}" method="POST" class="mb-10">
                @csrf
                @method('PATCH')

                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend">Selecionar jogador</legend>
                    <select name="user_id" id="user_id" class="w-full select @error('user_id') border-red-500 @enderror">
                        <option disabled selected>Jogador</option>
                        @foreach($usersRoom as $user)
                            <option value="{{ $user->id }}" {{ $points->user_id == $user->id ? 'selected' : '' }}>{{ $user->name }}</option>
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

                <x-primary-button class="w-full mt-5">{{ __('Atualizar') }}</x-primary-button>
            </form>

            <p class="w-full text-center mb-10">
                <button type="button" onclick="document.getElementById('form-delete').submit();" class="btn btn-soft btn-error px-2">
                    Apagar sala
                </button>
            </p>

        </div>
    </div>

    <form id="form-delete" action="/points/{{ $points->id }}/room/{{ $room->id }}" method="POST" class="hidden">
        @csrf
        @method('DELETE')
    </form>
</x-app-layout>
