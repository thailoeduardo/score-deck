<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Sala') }} {{$room->id}} -
            @if ($room->is_closed)
                fechada
            @else
                Aberta
            @endif
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xs sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <ul class="w-full space-y-2">
                        @forelse ($usersRoom as $user)
                            <li class="flex items-center justify-between border-b pb-2 space-x-4">
                                <div class="flex-1">
                                    <p class="font-semibold">{{ $user->name }}</p>
                                </div>
                                <div class="flex-1">
                                    <p class="text-gray-500">{{ $user->email }}</p>
                                </div>
                                <div class="flex-1">
                                    <p class="text-gray-400 text-sm">{{ $user->created_at->format('d/m/Y H:i') }}</p>
                                </div>
                            </li>
                        @empty
                            <p class="text-gray-500">Nenhum usuário na sala.</p>
                        @endforelse


                    </ul>

                    @if ($usersRoom->isEmpty() || $usersRoom->count() <= 1)
                        <form action="/room/{{$room->id}}" method="post" class="mt-4">
                            @csrf
                            <div class="mb-4">
                                <label for="user_id" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Selecione um usuário
                                </label>
                                <select name="user_id" id="user_id"
                                    class="form-select rounded-md shadow-xs mt-1 block w-full text-gray-700 @error('user_id') border-red-500 @enderror">
                                    <option value="">Selecione um usuário</option>
                                    @foreach($users as $user)
                                        <option value="{{ $user->id }}" {{ old('user_id') == $user->id ? 'selected' : '' }}>
                                            {{ $user->name }}
                                        </option>
                                    @endforeach
                                </select>

                                @error('user_id')
                                    <p class="text-red-500 text-xs mt-2">{{ $message }}</p>
                                @enderror
                            </div>

                            <x-primary-button>{{ __('Adicionar Jogador') }}</x-primary-button>
                        </form>
                    @endif
                </div>
            </div>
        </div>
    </div>


@if (!$points->isEmpty())
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xs sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <ul class="w-full space-y-2">
                        @forelse ($points as $point)
                            <li class="flex items
                            -center justify-between border-b pb-2 space-x-4">
                                <div class="flex-1">
                                    <p class="font-semibold">{{ $point->user->name }}</p>
                                </div>
                                <div class="flex-1">
                                    <p class="text-gray-500">{{ $point->points }}</p>
                                </div>
                                <div class="flex-1">
                                    <p class="text-gray-400 text-sm">{{ $point->created_at->format('d/m/Y H:i') }}</p>
                                </div>
                            </li>
                        @empty
                            <p class="text-gray-500">Nenhum ponto adicionado.</p>
                        @endforelse
                    </ul>

                </div>
            </div>
        </div>
    </div>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xs sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <ul class="w-full space-y-2">
                        @forelse ($totalPoints as $point)
                            <li class="flex items
                            -center justify-between border-b pb-2 space-x-4">
                                <div class="flex-1">
                                    <p class="font-semibold">{{ $point->user->name  }}</p>
                                </div>
                                <div class="flex-1">
                                    <p class="text-gray-500">{{ $point->total_points ?? 0 }} pontos</p>
                                </div>
                            </li>
                        @empty
                            <p class="text-gray-500">Nenhum ponto adicionado.</p>
                        @endforelse
                   </ul>
                </div>
            </div>
        </div>
    </div>
@endif


    @if ((!$usersRoom->isEmpty() || $usersRoom->count() >= 2) && !$room->is_closed)
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xs sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form action="/room/{{$room->id}}/point" method="post" class="mt-4">
                        @csrf
                        <div class="mb-4">
                            <label for="user_id" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Selecione um usuário
                            </label>
                            <select name="user_id" id="user_id"
                                class="form-select rounded-md shadow-xs mt-1 block w-full text-gray-700 @error('user_id') border-red-500 @enderror">
                                <option value="">Selecione um usuário</option>
                                @foreach($usersRoom as $user)
                                    <option value="{{ $user->id }}" {{ old('user_id') == $user->id ? 'selected' : '' }}>
                                        {{ $user->name }}
                                    </option>
                                @endforeach
                            </select>

                            <div class="mb-4">
                                <label for="points" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Points</label>
                                <input type="text" name="points" id="points" class="form-input
                                rounded-md shadow-sm mt-1 block w-full text-gray-700" value="{{ old('points') }}" />
                            </div>

                            @error('user_id')
                                <p class="text-red-500 text-xs mt-2">{{ $message }}</p>
                            @enderror

                            @error('points')
                                <p class="text-red-500 text-xs mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <x-primary-button>{{ __('Adicionar Jogador') }}</x-primary-button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    @endif

</x-app-layout>
